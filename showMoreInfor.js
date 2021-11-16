const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const detailInforItem = $$('.detail__infor-item');
const detailContentPanes = $$('.detail__content-pane');

// click để thấy nội dung trên PC
detailInforItem.forEach((Item, index) => {
    const pane = detailContentPanes[index];

    Item.onclick = function () {

        $('.detail__infor-item.detail__infor-item--active').classList.remove('detail__infor-item--active');
        $('.detail__content-pane.detail__content-pane--active').classList.remove('detail__content-pane--active');

        this.classList.add('detail__infor-item--active');
        pane.classList.add('detail__content-pane--active');
    }
})

// click để thấy nội dung trên điện thoại và Ipad
const detailPaneHeading = $$('.pane-heading');
const detailMinusIcons = $$('.pane-icon--minus-icon');
const detailPlusIcons = $$('.pane-icon--plus-icon');
const detailTabContent = $$('.pane-tab-content');

detailPaneHeading.forEach((Item, index) => {
    const content = detailTabContent[index]; 
    const disableIcon = detailMinusIcons[index];
    const activeIcon = detailPlusIcons[index];
    Item.onclick = function () {
        if(content.style.display == 'block') {
            content.style.display = 'none';
            disableIcon.style.display = 'none';
            activeIcon.style.display = 'block';
            Item.querySelector('.pane-title').style.color = 'black';
        }
        else{
            content.style.display = 'block';
            disableIcon.style.display = 'block';
            activeIcon.style.display = 'none';
            Item.querySelector('.pane-title').style.color = '#b59677';
        } 
    }
})

// click + - lên số ở phần detail: 
function stepper(btn) {
    const myInput = $('.my-input');
    let Class = btn.getAttribute("class");
    let min = myInput.min;
    let max = myInput.max;
    let value = myInput.value;
    let step = myInput.step;
    let calcStep = (Class == "increment") ? (step*1) : (step*-1);
    let newValue = parseInt(value) + calcStep;
    if(newValue >= min && newValue <= max) {
            myInput.value = newValue;
    }
}


// click + - lên số ở phần you may also like: 
function clickPlusMinusRecommendedInput() {
    const recommendedInput = $$('.recommended__input');
    const recommendedIncrement = $$('.recommended__increment');
    const recommendedDecrement = $$('.recommended__decrement');

    recommendedIncrement.forEach((item,index) => {
        let Input = recommendedInput[index];
        item.onclick = function () {
            let max = Input.max; 
            let value = Input.value;
            let newValue = parseInt(value) + 1;
            if(newValue <= max) {
                Input.value = newValue;
            }
        }
    });

    recommendedDecrement.forEach((item,index) => {
        let Input = recommendedInput[index];
        item.onclick = function () {
            let min = Input.min;
            let value = Input.value;
            let newValue = parseInt(value) + -1;
            if(newValue >= min) {
                Input.value = newValue;
            }
        }
    });
}

// hover vào màu ảnh chuyển
function hoverColorChangeImg() {
    const recomendedColorList = $$('.recommended__color-item');

    recomendedColorList.forEach((Item) => {
    Item.onmouseover = function (e) {
        let index = e.target.dataset.index - 1;
        let ParentItem = Item.parentElement.parentElement.parentElement;
        let recommendedImagine = ParentItem.querySelectorAll('.recommended-img')
        // console.log(ParentItem);
        console.log(index);
        console.log(recommendedImagine[index]);

        ParentItem.querySelector('.recommended-img.recommended-img--active').classList.remove('recommended-img--active');
        ParentItem.querySelector('.recommended__color-item.recommended__color-item--active').classList.remove('recommended__color-item--active');

        this.classList.add('recommended__color-item--active');

        recommendedImagine[index].classList.add('recommended-img--active');
    }
})
}




// Show slider khi click vào nút next hoặc previous
    var slideIndex = 1;

    function clickSlideBtn(n) {
        showSlide(slideIndex += n);
    }

    function showSlide(n) {
        var slides = $$('.item-imgBx');
        var detailColorList = $$('.color__list-item');
        $('.item-imgBx.item-imgBx--active').classList.remove('item-imgBx--active');
        $('.color__list-item.color__list-item--active').classList.remove('color__list-item--active');
    
        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }
        slides[slideIndex - 1].classList.add('item-imgBx--active');
        detailColorList[slideIndex -1].classList.add('color__list-item--active');
    }

// click vào màu trên mục detail thì nó chuyển ảnh 
function clickColorChangeSlide() {

    var slides = $$('.item-imgBx');
    var detailColorList = $$('.color__list-item');

    detailColorList.forEach((color, index) => {
    const slide = slides[index];

    color.onclick = function () {

        $('.color__list-item.color__list-item--active').classList.remove('color__list-item--active');
        $('.item-imgBx.item-imgBx--active').classList.remove('item-imgBx--active');

        this.classList.add('color__list-item--active');
        slide.classList.add('item-imgBx--active');
    }
    })
}

//sự kiện click next previous của mục you also may like
function slideItem() {
    const listItem = $$('.recommended__products-item');
    const wrapperItem = $('.recommended__products-wrapper');
    const recommendedBtnNext = $('.recommended__next-btn');
    const recommendedBtnPrev = $('.recommended__prev-btn');
    const recommendedProducts = $('.recommended__products');

    const media = [
        window.matchMedia('(min-width: 1366px)'),
        window.matchMedia('(min-width: 768px)'),
    ];
    
        if (media[0].matches) {
            makeItem(4);
        }
        else if(media[1].matches) {
            makeItem(2);
        }
        else makeItem(1);
    
    function makeItem(amountItemAppear) {
        const widthItem = recommendedProducts.offsetWidth /amountItemAppear;
        let widthAllItem = widthItem * listItem.length;
    
        wrapperItem.style.width = `${widthAllItem}px`;
    
        listItem.forEach((item) => {
            item.style.marginRight = '10px';
            item.style.marginLeft = '10px';
            item.style.width = `${widthItem - 20}px`;
        });
    
        var count = 0;
        let spacing = widthAllItem - amountItemAppear * widthItem;
        recommendedBtnNext.addEventListener('click', function () {
            count += widthItem;
            console.log(count);
            if (count > spacing) {
            count = 0;
            }
            wrapperItem.style.transform = `translateX(${-count}px)`;
        });
    
        recommendedBtnPrev.addEventListener('click', function () {
            count -= widthItem;
            console.log(count);
            if (count < 0) {
            count = spacing;
            }
            wrapperItem.style.transform = `translateX(${-count}px)`;
        });
    }    
}

detailProduct = {
        id: 1, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/detail_1.jpg",
            "./assets/img/detail_2.jpg",
            "./assets/img/detail_3.jpg",
            "./assets/img/detail_4.jpg",
            "./assets/img/detail_5.jpg",
            "./assets/img/detail_6.jpg",
            "./assets/img/detail_7.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
}

const renderDetailProduct = function() {
    const htmls = 
        `<div class="detail-item__slider">
        <div class="item-imgBx item-imgBx--active">
            <img class="item__img" src="${detailProduct.imgList[0]}" alt="">
        </div>
        <div class="item-imgBx">
            <img class="item__img" src="${detailProduct.imgList[1]}" alt="">
        </div>
        <div class="item-imgBx">
            <img class="item__img" src="${detailProduct.imgList[2]}" alt="">
        </div>
        <div class="item-imgBx">
            <img class="item__img" src="${detailProduct.imgList[3]}" alt="">
        </div>
        <div class="item-imgBx">
            <img class="item__img" src="${detailProduct.imgList[4]}" alt="">
        </div>
        <div class="item-imgBx">
            <img class="item__img" src="${detailProduct.imgList[5]}" alt="">
        </div>
        <div class="item-imgBx">
            <img class="item__img" src="${detailProduct.imgList[6]}" alt="">
        </div>
        <div class="detail-item__next-prev-btn">
            <button class="detail-item__prev-btn" onclick="clickSlideBtn(-1)"><i class="fas fa-chevron-left"></i></button>
            <button class="detail-item__next-btn" onclick="clickSlideBtn(1)"><i class="fas fa-chevron-right"></i></button> 
        </div>
    </div>

    <div class="item-infor">
        <h1 class="item__title">${detailProduct.name}</h1>
        <div class="item__price-status">
            <span class="item__price">${detailProduct.price}</span>
            <span class="item__status">In stock</span>
        </div>

        <div class="item__rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <span>(11 reviews)</span>
        </div>

        <div class="item-infor__description">
            A pair of twill woven shorts featuring slanted front pockets, buttoned back pockets, a zip 
            pocket, buttoned waist, and keychain loop.
        </div>

        <div class="item__option">
            <div class="item__option-color">
                <h4 class="color__title">COLOR:
                    <span>BLUE</span>
                </h4>

                <ul class="color__list">
                    <li class="color__list-item color--blue color__list-item--active"></li>
                    <li class="color__list-item color--red"></li>
                    <li class="color__list-item color--cyan"></li>
                    <li class="color__list-item color--black"></li>
                    <li class="color__list-item color--pink"></li>
                    <li class="color__list-item color--grey"></li>
                    <li class="color__list-item color--brown"></li>
                </ul>
            </div>
            <div class="item__option-size">
                <h4 class="size-title">SIZE: 
                    <span>XS</span>
                </h4>

                <ul class="size__list">
                    <li class="size__list-item"><span class="item__size">XS</span></li>
                    <li class="size__list-item"><span class="item__size">S</span></li>
                    <li class="size__list-item"><span class="item__size">M</span></li>
                    <li class="size__list-item"><span class="item__size">L</span></li>
                    <li class="size__list-item"><span class="item__size">XL</span></li>
                </ul>
            </div>
        </div>

        <div class="item__variation">
            <div class="variation__choose">
                <div class="item__change-input">
                    <button class="decrement" id="decrement" onclick="stepper(this)">-</button>
                    <input type="number" min="1" max="100" step="1" value="1" class="my-input" id="my-input" inputmode="numeric">
                    <button class="increment" id="increment" onclick="stepper(this)">+</button>
                </div>
                <button id="add-to-cart" class="add-to-cart-btn">Add to cart</button>
                <div class="item__favorative">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <button id="buy-it-now" class="buy-it-now-btn">Buy it now</button>
        </div>

        <div class="Img_box">
            <img class="img_more" src="./assets/img/img_more.png" alt="">
        </div>

        <div class="item__support-link">
            <a class="support-link" href="#">Size Guide</a>
            <a class="support-link" href="#">Delivery & Return</a>
            <a class="support-link" href="#">Ask a Question</a>
        </div>

        <div class="item__meta">
            <span class="sku__wrapper">SKU: 
                <span class="sku__value"> M-06</span>
            </span>
            <span class="item__meta-Category">Categories:
                <a href="#" title>${detailProduct.category}</a>
            </span>
            <span class="item__meta-tags">Tags:
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
                <a href="#" title> blue,</a>
            </span>
        </div>

        <div class="icon-bar">
            <i class="fab fa-facebook icon-facebook"></i>
            <i class="fab fa-twitter icon-twitter"></i>
            <i class="fas fa-envelope icon-envelope"></i>
            <i class="fab fa-facebook-messenger icon-messenger"></i>
        </div>
    </div>`;
    document.getElementById('detail-item').innerHTML = htmls;
    clickColorChangeSlide();
}

renderDetailProduct(); 

detailRecommendedProducts = [
    {
        id: 1, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
    {
        id: 2, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
    {
        id: 3, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
    {
        id: 4, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
    {
        id: 5, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
    {
        id: 6, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
    {
        id: 7, 
        name: "IPHONE 13 9", 
        sale: '189.00$',
        price: 100000, 
        category: "Laptop", 
        rate: 5,
        wish: 0,
        imgList: [
            "./assets/img/recomended-img_1.jpg",
            "./assets/img/recomended-img_2.jpg",
            "./assets/img/recomended-img_3.jpg",
            "./assets/img/recomended-img_4.jpg",
            // "./images/products/product-1-img-1.jpg",
            // "./images/products/product-1-img-2.jpg",
        ],
    },
]

const renderRecommendedProduct = function() {
    const htmls = detailRecommendedProducts.map((product) => {
        return`<div class="recommended__products-item">
        <div class="recommended__product-image">
            <div class="recommended__img">
                <img class="recommended-img recommended-img--active" src="${product.imgList[0]}" alt="">
                <img class="recommended-img" src="${product.imgList[1]}" alt="">
                <img class="recommended-img" src="${product.imgList[2]}" alt="">
                <img class="recommended-img" src="${product.imgList[3]}" alt="">
            </div>
            <div class="recommended__add-to-cart">
                <div class="recommended__quantity">
                    <div class="recommended__quantity-input">
                        <button class="recommended__decrement">-</button>
                        <input type="number" min="1" max="100" step="1" value="1" class="recommended__input" inputmode="numeric">
                        <button class="recommended__increment">+</button>
                    </div>
                </div>
                <span>
                    <button class="recommended__add-to-cart-btn" class="recommended__add-to-cart-btn">Add to cart</button>
                </span>
            </div>
        </div>

        <div class="recommended-product-infor">
            <h3>${product.name}</h3>
            <span>${product.price}</span>

        
        </div>
        <div class="recommended__control">
            <ul class="recommended__color-list">
                <li data-index="1" class="recommended__color-item color--blue recommended__color-item--active"></li>
                <li data-index="2" class="recommended__color-item color--red"></li>
                <li data-index="3" class="recommended__color-item color--cyan"></li>
                <li data-index="4"class="recommended__color-item color--black"></li>
                <li data-index="5" class="recommended__color-item color--pink"></li>
                <li data-index="6"class="recommended__color-item color--grey"></li>
                <li data-index="7"class="recommended__color-item color--brown"></li>
            </ul> 
        </div>
    </div>`;
    })

    document.getElementById('recommended__products-wrapper').innerHTML = htmls.join('');
    hoverColorChangeImg();
    clickPlusMinusRecommendedInput();
    slideItem();
}

renderRecommendedProduct();

// const recommendedProducts = $('.recommended__products');
// const wrapperItem = $('.recommended__products-wrapper');

// let isPressedDown = false;
// let cursorXSpace;

// recommendedProducts.addEventListener("mousedown", (e) => {
//     isPressedDown = true;
//     cursorXSpace = e.offsetX - wrapperItem.offsetLeft;
//     console.log(e.offsetX);
//     console.log(wrapperItem.offsetLeft);
//     console.log(cursorXSpace);
// });

// window.addEventListener("mouseup", () => {
//     isPressedDown = false;
// });

// recommendedProducts.addEventListener("mousemove", (e) => { 
//     if(!isPressedDown) return;
//     e.preventDefault();
//     wrapperItem.style.left = `${e.offsetX - cursorXSpace}px`;
//     boudItem();
// });

// function boudItem() {
//     const recommendedProducts_rect = recommendedProducts.getBoundingClientRect();
//     const wrapperItem_rect = wrapperItem.getBoundingClientRect();

//     if(parseInt(wrapperItem.style.left) > 0) {
//         wrapperItem.style.left = 0;
//     }
//     else if(wrapperItem_rect.right < recommendedProducts_rect.right) {
//         wrapperItem.style.left = `-${wrapperItem_rect.width - recommendedProducts_rect.width}px`;

//     }
    
