import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigate(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const timerId = setTimeout(() => navigate(props.nextPage), 1);
        return () => clearTimeout(timerId);
      }, [navigate, props.nextPage]);

    return (
        <div />
    );
}