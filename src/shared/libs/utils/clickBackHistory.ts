import { useEffect } from 'react'
import { useNavigate } from 'react-router';

const clickBackHistory = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const keyDownHandler = (event: any) => {

            if (event.key === 'Escape') {
                event.preventDefault();
                navigate(-1)
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    return {}
}

export default clickBackHistory