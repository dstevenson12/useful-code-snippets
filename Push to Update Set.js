var table_name = "incident"; // put the table name in double quotes
var add_query = ""; // put query in here if needed
addRecordAndAttachmentsToCurrentUpdateSet();

function addRecordAndAttachmentsToCurrentUpdateSet() {
    var rec = new GlideRecord(table_name);
    rec.addQuery(add_query);
    rec.query();
    while (rec.next()) {
        //Push the record into the current update set 
        var um = new GlideUpdateManager2();
        um.saveRecord(rec);
        //Add each attachment to Update Set 
        var att = new GlideRecord("sys_attachment");
        att.addQuery("table_name", table_name);
        att.addQuery("table_sys_id", "rec.sys_id");
        att.query();
        while (att.next()) {
            addAttachmentToUpdateSet(att);
        }
    }
}

function addAttachmentToUpdateSet(attachmentGR) {
    var um = new GlideUpdateManager2();
    um.saveRecord(attachmentGR);
    var attdoc = new GlideRecord("sys_attachment_doc");
    attdoc.addQuery("sys_attachment", attachmentGR.sys_id);
    attdoc.orderBy("position");
    attdoc.query();
    while (attdoc.next()) {
        um.saveRecord(attdoc);
    }
}