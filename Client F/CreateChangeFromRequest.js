var CreateChangeFromRequest = Class.create();
CreateChangeFromRequest.prototype = {
    initialize: function (record) {

        var chg = new GlideRecord('change_request');
        chg.initilize();
        // fields and template to copy over to a new change request
        chg.parent = record; // only necessary if we want to see the originating record on the change request
        chg.applyTemplate(record.variables.u_template.getDisplayValue());
        chg.insert();

        // update the orinating requested item with the reference back to the change request
        var ritm = new GlideRecord('sc_req_item');
        ritm.get(record);
        ritm.variables.chg_ticket = chg;
        ritm.update();

    },

    type: 'CreateChangeFromRequest'
}