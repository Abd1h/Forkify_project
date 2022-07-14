class SearchView {
#parentEL = document.querySelector('.search') //parent of the search bar

// - getting the input value for search bar
getQuery(){
 const query = this.#parentEL.querySelector('.search__field').value
 this.#clearInput()
 return query
}

#clearInput(){
this.#parentEL.querySelector('.search__field').value = '';
}

// - publisher subscriber pattren for the ""search bar"" event
addHandlerSearch(handler){
this.#parentEL.addEventListener('submit',function(e){ /////// listening to the submit instead of click on the parent element to listen to click + enter
    e.preventDefault()
    handler()/////////// calling a parameter 
   
}) 

}


}

export default new SearchView()