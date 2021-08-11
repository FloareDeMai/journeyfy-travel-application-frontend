import React from 'react'

function Hotels() {
    useEffect(() => {
        axios.get(URL).then((response) => {
            setCountriesList(response.data);
            setIsLoading(false);
        });
    }, []);
    return (
        <div>
            
        </div>
    )
}

export default Hotels
