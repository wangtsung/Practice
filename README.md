# Practice

modify index.js   
    
    getData("msft");
    getDaliyData("msft");   
    getData("dis");
    getDaliyData("dis");
 to
    getData("msft");
    if (temp != 1) {
        getDaliyData("msft");
        getData("dis");
        getDaliyData("dis");
    }
