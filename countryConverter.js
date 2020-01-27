const countryConvert = typedCountry => {
    let lowCase = typedCountry.toUpperCase();
    if(countryNames[lowCase] === undefined) {
        console.log("Country not found!")
    }else{
        console.log("Country Found");
    }
}