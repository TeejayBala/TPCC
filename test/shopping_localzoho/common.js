window.common = {
    login : () => {

    },
    logout : () => {

    },
    add_to_cart : (product) => {
        if (product) {
            dataLayer.push({
                event: 'add_to_cart',
                ecommerce: {
                    items: [{
                        item_id: "cart_"+product.id,
                        item_name: product.name,
                        price: product.price,
                        quantity: 1
                    }]
                }
            });
        }
    },
    purchase : (items) => {
        if (items) {
            dataLayer.push({
                event: 'purchase',
                ecommerce: {
                    items: items
                }
            });
        }
    },
    begin_checkout : (items) => {
        var _items = [{
            item_id: "cart_"+product.id,
            item_name: product.name,
            price: product.price,
            quantity: 1
        }];
        if (items) {
            dataLayer.push({
                event: 'begin_checkout',
                ecommerce: {
                    items: items
                }
            });
        }
    },
    view_item : (product) => {
        if (product) {
            dataLayer.push({
                event: 'view_item',
                ecommerce: {
                    items: [{
                        item_id: "cart_"+product.id,
                        item_name: product.name,
                        price: product.price,
                        quantity: 1
                    }]
                }
            });
        }
    },
    search : () => {

    },
    thankyou : () => {

    }
}