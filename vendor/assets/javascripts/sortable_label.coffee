class @SortableLabel

  defaults =
    sortableItem: '> div.fields'
    labelTarget: 'label'
    positionTarget: '.position-field'
    nestedTarget: null
    label: 'Step '
    minimun: 0

  constructor: (scope, options) ->
    @options   = $.extend({}, defaults, options)
    @target    = scope
    @targetId  = @options['fieldName'] || @target.attr('id')
    
    @calInitStepLable()

    $(document).on("nested:fieldAdded:#{@targetId}", (event) =>
      @calStepLable()
      if @options['nestedTarget']
        @options['nestedTarget'].call(@target)
    )

    $(document).on("nested:fieldRemoved:#{@targetId}", (event) =>
      @calStepLable()
    )

    @target.on('sortableLabel:refresh', =>
      @target.sortable("enable")
      @calStepLable()
    )

    if @options['nestedTarget']
      @options['nestedTarget'].call(@target)

    @target.sortable(
      items: @options['sortableItem']
      placeholder: "ui-state-highlight"
      start: (event, ui)->
        $(this).find('.ui-state-highlight').css('height', $(ui.item).css('height'))        
      stop: =>
        @calStepLable()
    )

    @target.on('sortableLabel:disable', =>
      @target.sortable('disable')
    )

  calInitStepLable: ->
    this.calLabel(this.options['labelTarget'])
    this.calWeekGroupLabel(this.options['weekGroupLabelTarget'])

  calStepLable: ->
    this.calLabel(this.options['labelTarget']+':visible')
    this.calWeekGroupLabel(this.options['weekGroupLabelTarget']+':visible')

  calLabel: (target) ->
    _this = this
    $(@target.selector).each(->
      stepCount = 1
      $(this).find(target).each( ->
        if typeof(_this.options['label']) == 'string'
          if _this.options['label'].trim() == 'Day'          
            $(this).html(_this.dayOfWeek(stepCount - 1))            
          else
            $(this).html(_this.options['label'] + stepCount)
        else if typeof(_this.options['label']) == 'function'
          $(this).html(_this.options['label'].call(this, stepCount))
        $(this).closest('.fields').find(_this.options['positionTarget']).val(stepCount)
        if _this.options['minimun'] >= stepCount
          $(this).closest('.fields').find('.remove_nested_fields').hide();
        else
          $(this).closest('.fields').find('.remove_nested_fields').show();
        stepCount += 1
      )      
    )

  calWeekGroupLabel: (target) ->
    _this = this
    week_group_label_list = []
    $(@target.selector).each(->
      $(this).find(target).each(->
        _index = _this.isIncludeWeekGroup($(this).text(), week_group_label_list)
        if _index is -1
          week_group_label_list.push(
            name: $(this).text(),
            count: 1
          )
          $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>"+$(this).text()+" 1")
        else if _index > -1
          week_group_label_list[_index].count += 1
          $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>"+$(this).text()+" "+week_group_label_list[_index].count)
      )
    )

  isIncludeWeekGroup: (item, arr)->
    if item == " "
      return -2
    for _item, index in arr
      return index if _item.name is item
    return -1

  dayOfWeek: (dayIndex) ->
    ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex]

(($) ->
  $.fn.sortableLabel = (options) ->
    new SortableLabel(this, options)
)(jQuery)