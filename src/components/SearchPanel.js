import "styles/components/search_panel.scss";
import { DebounceInput } from 'react-debounce-input';
import {FiSearch} from 'react-icons/fi';
import styled from 'styled-components';

const StyledForm = styled.form`
        background-color: #fff;
        border-radius: 10px;
        height: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 5px;
        border: '1px solid #9c9c9c';
`

const SearchPanel = ({auto, manual}) => {

    return (
        <StyledForm className="_search-input" autoComplete="off">
            <DebounceInput 
            type="text" 
            minLength={1} 
            debounceTimeout={1500} 
            onChange={(e)=> auto(e.target.value)} 
            onFocus={(e) => auto(e.target.value)} 
            />
            <a onClick={()=> manual()}>
                <FiSearch />
            </a>
        </StyledForm>
    )
}

export default SearchPanel;