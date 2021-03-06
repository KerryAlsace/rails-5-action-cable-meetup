App.messagesSubscription = App.cable.subscriptions.create('MessagesChannel', {  
  received: function(data) {
    // debugger;
    $("#messages").removeClass('hidden')
    return $('#messages').append(this.renderMessage(data));
  },
  renderMessage: function(data) {
    return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
    // return $("[data-chatroom='" + data.chatroom_id + "']").append(data.message);
  }
});

$(document).on('turbolinks:load', function() {
  submitNewMessage();
});

function submitNewMessage(){
  $('textarea#message_content').keydown(function(event) {
    if (event.keyCode == 13) {
      // debugger;
      App.messagesSubscription.send({message: event.target.value, chatroom_id: chatroomId})
        // var msg = event.target.value
        var chatroomId = $("[data-chatroom]").data().chatroom
        // App.messages.send({message: msg, chatroom_id: chatroomId})
        $('[data-textarea="message"]').val(" ")
        return false;
     }
  });
}