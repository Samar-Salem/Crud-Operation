

let productNameInput = document.getElementById("productName");//name input kolo
let productPriceInput = document.getElementById("productPrice");//price input kolo
let productCategoryInput = document.getElementById("productCategory");//category input kolo
let productDescInput = document.getElementById("productDesc");//descreption input kolo
let allInputs = document.getElementsByClassName("allInputs");
let productsContainer;  //local var
let addBtn = document.getElementById("add");
let searchInput = document.getElementById("search");
let cancelBtn = document.querySelector(".cancel");
let mainIndex = 0;
let alerts = document.getElementsByClassName("alert")




function removeAlertBox(){
    for(i=0 ; i<alerts.length ; i++){
        alerts[i].classList.add('d-none')
        }
}


// Check storage 
if (localStorage.getItem("products") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}


 // Add new product
function addProduct() {

    if ( checkInputs() && validateProductName())
     {
        let product = 
        {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        if (addBtn.innerHTML == "Add Product") {
            productsContainer.push(product);
        }
        else {
        // at position (mainindex) remove 1 item and add product object above
            productsContainer.splice(mainIndex,1,product)
            addBtn.innerHTML = "Add Product"
            addBtn.style.backgroundColor = " #17a2b8 ";
            addBtn.style.border = "1px solid #17a2b8"
             }
           
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts();
        clearForm();
        removeAlertBox()
       
        
     }
     else{
        if(productNameInput.value =="")
        {
           document.getElementById("alertName").classList.remove('d-none')  
           document.getElementById("alertName").innerHTML = "product name is required"; 
        }
        else if(!validateProductName()){
            document.getElementById("alertName").classList.remove('d-none')  
            document.getElementById("alertName").innerHTML = "product name is in-valid"; 

        }else{
            document.getElementById("alertName").classList.add('d-none')  
        }
       if(productPriceInput.value == "" )
       {
           document.getElementById("alertPrice").classList.remove('d-none') 
           document.getElementById("alertPrice").innerHTML = "price is required"; 
       }else{
        document.getElementById("alertPrice").classList.add('d-none') 
       }
      if(productCategoryInput.value == "" )
       {
           document.getElementById("alertCategory").classList.remove('d-none')
           document.getElementById("alertCategory").innerHTML = "product describtion  is required";
       }else{
        document.getElementById("alertCategory").classList.add('d-none')
       }
      if(productDescInput.value == "" )
       {
           document.getElementById("alertDesc").classList.remove('d-none')  
           document.getElementById("alertDesc").innerHTML = "product category is required";
       }else{
        document.getElementById("alertDesc").classList.add('d-none')  
       }
     }

 } 
        



// Check that all inputs aren't empty
function checkInputs() {
    if (productNameInput.value !="" && productPriceInput.value != "" && productCategoryInput.value != "" && productDescInput.value != "") {
        return true;
    }
   
    else {
        return false;
    }
}


// Check validation for Prouduct Name 
function validateProductName() {
    let regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(productNameInput.value) == true) {
        return true;
    }
    else {
        errors = `<p>product name is in-valid</p>`;
        return false;
    }
}



// Search in my products
function searchProduct()
{
    box = `` ; 
    for( i = 0 ; i < productsContainer.length ; i++ )
    {
      
        if(productsContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true)
        {
            box += ` <tr> 
            <td> ${i}</td>
            <td> ${productsContainer[i].name}</td>
            <td> ${productsContainer[i].price} </td>
            <td> ${productsContainer[i].category}</td>
            <td> ${productsContainer[i].desc}</td>
            <td><button class=" btn btn-warning text-light " onclick = "updateProduct(${i})"> Update </button> </td>
            <td><button class=" btn btn-danger" onclick =" deleteProduct(${i})" > Delete </button> </td>
            </tr>`;
        }
    }
         
    document.getElementById("tableBody").innerHTML = box;
}

searchInput.addEventListener("keyup", searchProduct)




// Clear valus from all inputs 
function clearForm() {

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

// Display Prooducts in table
function displayProducts() {
    let cartona = ``;
    for (let i = 0; i < productsContainer.length; i++) {
        cartona += ` <tr> 
        <td> ${i}</td>
        <td> ${productsContainer[i].name}</td>
        <td> ${productsContainer[i].price} </td>
        <td> ${productsContainer[i].category}</td>
        <td> ${productsContainer[i].desc}</td>
        <td><button class=" btn btn-warning " onclick = "updateProduct(${i})"> Update </button> </td>
        <td><button class=" btn btn-danger" onclick ="deleteProduct(${i})" > Delete </button> </td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

// Delete
function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts();
}

// Update
function updateProduct(index) {
  
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescInput.value = productsContainer[index].desc;

    addBtn.innerHTML = "update";
    addBtn.style.backgroundColor = " #ffc107 ";
    addBtn.style.border = "1px solid #ffc107"
   
   mainIndex = index
}

// Cancel
function cancel()
{
    
    clearForm()
    removeAlertBox()
    addBtn.innerHTML = "Add Product"
    addBtn.style.backgroundColor = " #17a2b8 ";
    addBtn.style.border = "1px solid #17a2b8"
    // cancelBtn.classList.add("d-none");

}




