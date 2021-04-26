import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import recipeServerAPI from '../../database/recipeServerAPI.js';


Modal.setAppElement('#root');

const ModifyRecipePicturesModal = (props) => {
    const dispatch = useDispatch();
    // const location = useLocation();
    const { user, token, authenticated: isAuth } = useSelector(state => state.accountReducer);
    // const userRecipe = useSelector(state => state.userRecipesReducer);
    const [response, setResponse] = useState();
    const [pictureFiles, setPictureFiles] = useState();
    // const [recipePics, setRecipePics] = useState([]);

    const uploadPictures = () => {
        //If no picture file is set, no need to dispatch
        if (!pictureFiles) {
            return;
        }

        console.log("From pictureFiles:", pictureFiles);
    
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
        setTimeout(() => { dispatch(recipeServerAPI('myRecipes', user.username))}, 1000)
    }

    const deletePictures = () => {
        if (isAuth) {
            const username = user.username;
            const recipe_id = props.recipe_id;
            const config = { recipe_id, token, username }
            console.log("props.recipe_id", recipe_id);
            dispatch(recipeServerAPI('deletePictures', config));
        }
    }


    return (
        <div>
        <Modal
            isOpen={ props.openModifyRecipePicturesModal }
            onRequestClose={ props.handleCloseModal }
            onAfterOpen={ () => setResponse('') } //Clear responses when modal opens
            onAfterClose={ () => setResponse('') } //If modal gets closed, reset any response
            contentLabel="Upload recipe pictures" //Accessability label
            closeTimeoutMS={ 250 }
            className="modal"
        >
            
            <form encType='multipart/form-data'>
                { (props.pictures).map((pic) => (
                    <img 
                        key={ pic._id } 
                        // style={{ width: 150, height: 150 }} 
                        height="120" width="120"
                        src={ `data:image/jpeg;base64,${pic.picture.data}` } 
                    />
                ))}

                {/* The "multiple" HTML tag will alow multiple files to be uploaded at once. */}
                <input type="file" id="image-upload" multiple onChange={ (e) => setPictureFiles(e.target.files) } />
            </form>
            { response && <p>{ response }</p> }
            <button className="button" onClick={ props.handleCloseModal }>Cancel</button>
            <button className="button" onClick={ deletePictures }>Delete pictures</button>
            <button className="button" onClick={ isAuth && uploadPictures }>Upload</button>
        </Modal>
        </div>
    )
}

export { ModifyRecipePicturesModal as default }