import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const RatingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const Star = styled(FaStar)`
    font-size: 2rem;
    margin-right: 5px;
    color: #fecf03; /* Sempre colorida */
`;

const StarRating: React.FC = () => {
    return (
        <RatingContainer>
            {[...Array(5)].map((_, index) => (
                <Star key={index} />
            ))}
        </RatingContainer>
    );
};

export default StarRating;
