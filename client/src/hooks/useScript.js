import { useEffect } from 'react';

const useScript = (scriptLocation) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = scriptLocation;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);
}

export { useScript as default }
//or export default useScript