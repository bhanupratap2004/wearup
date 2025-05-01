console.clear();

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let product = JSON.parse(localStorage.getItem('selectedProduct'));

function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;

    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.innerText = ob.name;

    let h4 = document.createElement('h4');
    h4.innerText = ob.brand;

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.innerText = 'Rs ' + ob.price;

    let h3 = document.createElement('h3');
    h3.innerText = 'Description';

    let para = document.createElement('p');
    para.innerText = ob.description;

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.innerText = 'Product Preview';

    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    ob.photos.forEach((photo, index) => {
        let previewImg = document.createElement('img');
        previewImg.id = 'previewImg';
        previewImg.src = photo;

        previewImg.onclick = function () {
            imgTag.src = this.src;
        };

        productPreviewDiv.appendChild(previewImg);
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.innerText = 'Add to Cart';

    buttonTag.onclick = function () {
        let order = ob.id + " ";
        let counter = 1;

        if (document.cookie.indexOf(',counter=') >= 0) {
            order = ob.id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }

        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
    };

    buttonDiv.appendChild(buttonTag);

    // Append all sections
    document.getElementById('containerProduct').appendChild(mainContainer);
    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);

    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);

    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
}

if (product) {
    dynamicContentDetails(product);
} else {
    document.getElementById('containerProduct').innerHTML = '<h2>Product not found!</h2>';
}
