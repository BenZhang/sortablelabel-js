describe("default config test", function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath="base/spec/javascripts/fixtures";
    loadFixtures("sortable_default.html");
  });

  it("default config sortable test", function() {
    $('#test-part').sortableLabel();
    var allElements = $('.fields.ui-sortable-handle');

    $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

    $('label').each(function(index, item) {
    	expect($(item).html()).toBe('Step '+String(index+1));
    });


    var expectedIdList = '3124',
    		targetIdList = '';
    $('.fields').each(function(inedx, item) {
    	targetIdList += String($(item).attr('id'));
    });
    expect(targetIdList).toBe(expectedIdList);


    $('.position-field').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

  it("sortable options label is Day", function() {
  	var weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  	$('#test-part').sortableLabel({
  		label: "Day"
  	});  
    var allElements = $('.fields.ui-sortable-handle');
  	$(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');
  	$('label').each(function(index, item) {
    	expect($(item).html()).toBe(weekday[index]);
    });
    var expectedIdList = '3124',
    		targetIdList = '';
    $('.fields').each(function(inedx, item) {
    	targetIdList += String($(item).attr('id'));
    });
    $('.position-field').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

  it("has deleted label", function() {
  	$('.fields').last().append("<div class='fields' id='5'><label></label><input class='position-field'></div>");

  	$('#test-part').sortableLabel();

  	$($('.fields')[2]).css('display', 'none');

  	$('#test-part').trigger('sortableLabel:refresh');
  	$('label:visible').each(function(index, item) {
  		expect($(item).html()).toBe('Step '+String(index+1));
  	});
    var expectedIdList = '1245',
    		targetIdList = '';
    $('.fields:visible').each(function(inedx, item) {
    	targetIdList += String($(item).attr('id'));
    });
    $('.position-field:visible').each(function(index, item) {
      expect($(item).val()).toBe(String(index+1));
    });
  });

});