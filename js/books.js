const loadbooks = () =>{
    const input = document.getElementById('input-field');
    const searchText = input.value;

    // error handling for empty input
    if (searchText === '') {
        alert('plz type a book name');
    }
    else {
        input.value = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
        }
}

const displayBooks = data => {
    const books = data.docs;
    // console.log(books);

    // error handling for no results found
    if(books.length === 0) {
        alert('no matching result found, plz try again');
    }
    else {
        // display total search result
        const totalResult = document.getElementById('total-result');
        totalResult.textContent = '';
        const result = document.createElement('div');
        result.innerHTML = `
            <p class="card-text d-inline">Total search resullts found: <span class="fw-bold fs-5">${books.length}</span></p>
        `
        totalResult.appendChild(result);
        
        // display search results
        const parentCall = document.getElementById('display-books');
        parentCall.textContent = '';

        books.forEach(book => {
            // console.log(book);
            const bookImage = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img height="300px" src="${bookImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${book.title}</h4>
                        <h6 class="card-text fst-italic">${book?.author_name[0]}</h6>
                        <p class="card-text">Publisher: ${book?.publisher[0]}</p>
                        <p class="card-text d-inline">First published: <span class="fw-bold fs-5">${book?.first_publish_year}</span></p>
                    </div>
                </div>
            `
            parentCall.appendChild(div);
        })
    }
}































