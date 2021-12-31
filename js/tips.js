"use strict";

let tips = [];

const drawTips = () => {
    let output = '';
    tips.forEach((item) => {
        output += '<tr>';
        output += '<th scope="row">' + item.id + '</th>';
        output += '<td>' + item.text.substring(0, 50) + '</td>';
        output += '<td>' + item.pay + '</td>';
        output += '<td>' + item.smile + '</td>';
        output += '<td>' + item.active + '</td>';
        if (item.id) {
            output += '<td data-tip-id="' + item.id + '"><button class="btn btn-primary"><i class="lni lni-pencil" /></button></td>';
        } else {
            output += '<td><button disabled="disabled" class="btn btn-primary"><i class="lni lni-alarm-clock" /></button></td>';
        }
        output += '</tr>'
    });
    document.getElementById("tips-records").innerHTML = output;
};

const loadTips = () => {
    fetch("https://iibot.ru/api/v5/get_tips")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            tips = data;
            drawTips();
        });
};

const prepareTip = (e) => {
    e.preventDefault();
    const form = jQuery('#tips-edit-form')[0];
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    const tip = {
        "text": jQuery('#tip-text').val(),
        "article": jQuery('#tip-article').val(),
        "smile": jQuery('#tip-smile').val(),
        "pay": jQuery('#tip-pay').is(":checked"),
        "active": jQuery('#tip-active').is(":checked"),
    };
    const tipId = jQuery('#tip-id').val();
    if (tipId) {
        tip["id"] = tipId;
    }
    jQuery('#tips-edit-form-error').hide();
    saveTip(tip);
    return false;
};

const fillTipForm = (tip) => {
    jQuery('#tip-id').val(tip.id);
    jQuery('#tip-text').val(tip.text);
    jQuery('#tip-article').val(tip.article);
    jQuery('#tip-smile').val(tip.smile);
    jQuery('#tip-pay').prop('checked', tip.pay);
    jQuery('#tip-active').prop('checked', tip.active);
};

const onEditTipClick = (e) => {
    const tipId = parseInt(jQuery(e.target).closest('td').attr("data-tip-id"));
    const tip = tips.find((t) => t.id === tipId);
    jQuery('#add-tip-button').click();
    fillTipForm(tip);
};


const saveTip = (tip) => {
  let url = 'https://iibot.ru/api/v5/save_tips';

  fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(tip)
    })
    .then(function(res){
        jQuery('#tips-edit-form')[0].reset();
        loadTips();
        jQuery('#tips-modal-close').click();
    })
    .catch(function(res){
        console.error(res);
        jQuery('#tips-edit-form-error').show();
    })
};

jQuery(()=> {
    loadTips();

    jQuery('#tips-edit-form').on('submit', prepareTip);
    jQuery('#tips-edit-save-button').on('click', () => {jQuery('#tips-edit-form').submit()});

    jQuery('#tips-records').on('click', 'button', onEditTipClick);
});
