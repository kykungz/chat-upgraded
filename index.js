$(function () {
    let endpoint = 'http://exceed.srakrn.me/api'
    let room = '/software'
    let lastResponse = ''

    setInterval(function() {
        $.ajax({
            type: "GET",
            url: endpoint + room + '/view',
            dataType: "text",
            success: function (response) {
                if (response !== '' && response !== lastResponse) {
                    lastResponse = response
                    $("#chatbox").append(`
                    <div class="text-left">
                        <h4>Server:</h4>
                        <div class="alert alert-primary" role="alert">
                            ${response}
                        </div>
                    </div>
                `);
                }
            },
            fail: function (response) {
                console.log(response);
            }
        })
    }, 1000)

    $("#user-input").on("keypress", function (event) {
        if (event.key === "Enter") {
            $("#send-button").click();
        }
    });

    $("#send-button").on("click", function () {
        let text = $("#user-input").val();
        if (text.trim() !== '') {
            $("#chatbox").append(`
                <div class="text-right">
                    <h4>You:</h4>
                    <div class="alert alert-success" role="alert">
                        ${text}
                    </div>
                </div>
            `);
            $.ajax({
                type: "POST",
                url: endpoint + room + '/set',
                data: {
                    value: text
                },
                dataType: "json",
                success: function (response) {
                    lastResponse = text
                }
            });
        }
        $("#user-input").val('');
    });
});
