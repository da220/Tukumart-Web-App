/**
 * Created by Daniel
 */
$(function(){
  const $cartQuantity = $('#cart-quantity');
  const $addToCart = $('.btn-add-to-cart');
  $addToCart.click(ev => {
    ev.preventDefault();
    const $this = $(ev.target);
    const id = $this.closest('.product-item').data('key');
    console.log(id);
    $.ajax({
      method:'POST',
      url: $this.attr('href'),
      data: {id},
      success: function(){
        console.log(arguments)
        $cartQuantity.text(parseInt($cartQuantity.text() || 0) +1 )
      }
    })
  })

  $itemQuantities.change(ev => {
    const $this = $(ev.target);
    const id = $this.closest('tr').data('id');
    $.ajax({
      method: 'post',
      url: $tr.data('url'),
      data: {id, quantity: $this.val()},
      success: function(totalQuantity){
        $cartQuantity.text(totalQuantity);
      }
    })
  })
});