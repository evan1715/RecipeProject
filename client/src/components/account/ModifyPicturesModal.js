import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import recipeServerAPI from '../../database/recipeServerAPI.js';


Modal.setAppElement('#root');

const ModifyPicturesModal = (props) => {
    const dispatch = useDispatch();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    const [response, setResponse] = useState();
    const [pictureFiles, setPictureFiles] = useState();
    const [selectedPicture, setSelectedPicture] = useState();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const uploadPictures = () => {
        //If no picture file is set, no need to dispatch
        if (!pictureFiles) {
            return;
        }
    
        //Check the file type
        for (let i = 0; i < pictureFiles.length; i++) {
            console.log("File type attempted to upload:", pictureFiles[i].type);
            if (!pictureFiles[i].type.match(/(png|jpg|jpeg|bmp)/)) {
                return setResponse("Not a supported file type.");
            }
        }

        const recipe_id = props.recipe_id;
        const config = { pictureFiles, recipe_id, token }

        recipeServerAPI('uploadPictures', config);
        setResponse("Uploaded!");
        setTimeout(() => { dispatch(recipeServerAPI('myRecipes', user.username)); }, 1000);
        setTimeout(() => { props.handleCloseModal(); }, 1500)
    }

    const deletePictures = (pic_id) => {
        const username = user.username;
        const recipe_id = props.recipe_id;
        const config = { recipe_id, token, username, pic_id }

        if (!isAuth) {
            return;
        } else {
            console.log("props.recipe_id", recipe_id);
            dispatch(recipeServerAPI('deletePictures', config));
            setResponse("Deleted!");
            setTimeout(() => {
                props.handleCloseModal();
            }, 1500);
        }
    }


    return (
        <Modal
            isOpen={ props.openModifyPicturesModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => {
                setResponse('');
                setSelectedPicture('');
                setDeleteConfirm(false);
            }} //If modal gets closed, reset any response
            contentLabel="Upload recipe pictures" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal__pictures"
        >
            
            <form encType='multipart/form-data'>
                <div className="row center">
                { (props.pictures).map((pic) => (
                    <div key={ pic._id } className="column">
                        <img
                            key={ pic._id } 
                            // style={{ width: 150, height: 150 }} 
                            height="120" width="120"
                            src={ `data:image/jpeg;base64,${pic.picture.data}` } 
                        />
                        <input type="radio" onClick={ () => setSelectedPicture(pic._id) } />
                    </div>
                ))}
                </div>

                <p>
                    <input type="file" id="image-upload" multiple onChange={ (e) => setPictureFiles(e.target.files) } />
                </p>
            </form>
            { response && <p>{ response }</p> }
            { !deleteConfirm ? 
                <div>
                    <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
                    <button className="button" onClick={ () => deletePictures(selectedPicture) } disabled={ !selectedPicture }>Delete one</button>
                    <button className="button" onClick={ () => setDeleteConfirm(true) }>Delete all</button>
                    <button className="button" onClick={ isAuth && uploadPictures }>Upload</button>
                </div>
                :
                <div>
                    <p>Are you sure you want to delete all pictures for this recipe?</p>
                    <button className="button" onClick={ () => deletePictures('all') }>Yes</button>
                    <button className="button" onClick={ () => setDeleteConfirm(false) }>No</button>
                </div>
            }
        </Modal>
    )
}

export { ModifyPicturesModal as default }