import React, {useState} from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
   height: 100%;
   width: 100%;
   transition: opacity 1s;
   opacity: ${props => props.loaded? '1' : '0'}
`

const Image = ({src, alt}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
          <StyledImage src={src} alt={alt} onLoad={()=> setImageLoaded(true)} loaded={imageLoaded? true : false} />
        </>
    )

}

export default Image;