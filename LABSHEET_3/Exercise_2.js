let cart = [];
let couponDiscount = 0;

function addToCart() {
    const data = document.getElementById("productSelect").value.split("|");
    const qty = parseInt(document.getElementById("quantity").value);

    const product = {
        name: data[0],
        category: data[1],
        price: parseInt(data[2]),
        image: data[3],
        quantity: qty
    };

    const existing = cart.find(p => p.name === product.name);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push(product);
    }

    updateCart();
}


function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function applyCoupon() {
    const code = document.getElementById("coupon").value.trim().toUpperCase();

    if (code.startsWith("SAVE")) {
        couponDiscount = 0.10; // 10%
        alert("Coupon Applied: 10% OFF");
    } else if (code === "FLAT500") {
        couponDiscount = 500;
        alert("Coupon Applied: ₹500 OFF");
    } else {
        couponDiscount = 0;
        alert("Invalid Coupon");
    }

    updateCart();
}


function calculateDiscount(subTotal) {
    let discount = 0;

   
    const totalQty = cart.reduce((sum, p) => sum + p.quantity, 0);
    if (totalQty >= 5) discount += subTotal * 0.10;

    
    cart.forEach(p => {
        if (p.category === "electronics") {
            discount += p.price * p.quantity * 0.05;
        }
    });

   
    const hour = new Date().getHours();
    if (hour >= 18 && hour <= 21) {
        discount += subTotal * 0.05;
    }

    return discount;
}


function updateCart() {
    const body = document.getElementById("cartBody");
    body.innerHTML = "";

    let subTotal = 0;

    cart.forEach((p, index) => {
        const total = p.price * p.quantity;
        subTotal += total;

        body.innerHTML += `
        <tr>
            <td><img src="${p.image}" width="60" height="60"></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>₹${p.price}</td>
            <td>${p.quantity}</td>
            <td>₹${total}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        </tr>
        `;
    });

    let discount = calculateDiscount(subTotal);

    if (couponDiscount) {
        discount += couponDiscount < 1 ? subTotal * couponDiscount : couponDiscount;
    }

    const finalAmount = Math.max(subTotal - discount, 0);

    document.getElementById("summary").innerHTML = `
        Subtotal: ₹${subTotal}<br>
        Discount: ₹${discount.toFixed(2)}<br>
        <b>Total Payable: ₹${finalAmount.toFixed(2)}</b>
    `;
}
