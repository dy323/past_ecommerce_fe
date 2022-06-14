import { useState} from 'react';


//customized useState for local storage
const useLocalStorage = (key, value) => {

    const [data, setData] = useState(()=> {
        try {
            const exist = window.localStorage.getItem(key);
            return exist ? JSON.parse(exist) : value;
        } catch (err) {
            console.log(err);
            return value;
        }
    })

    const saveData = (val) => {
        try {

            const valueToStore = value instanceof Function ? val(data) : val;

            setData(valueToStore);

            if (window.localStorage.getItem(key)) {
                window.localStorage.removeItem(key); 
            }

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.log(err);
        }
    }

    return [data, saveData];

}

export default useLocalStorage;