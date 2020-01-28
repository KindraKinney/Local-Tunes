const countryConvert = typedCountry => {
    debugger;
    let countryToSearch = responseCountryName;
    if(countryNames[countryToSearch] === undefined) {
        alert("Please enter a valid country!")
    }else{
        console.log("Country Found");
        return countryNames[countryToSearch];
    }
}