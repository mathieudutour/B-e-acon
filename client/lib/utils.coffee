@utils = {}

# Vendor Prefixe from http://davidwalsh.name/vendor-prefix
@utils.vendorPrefix = (->
  styles = window.getComputedStyle(document.documentElement, "")
  pre = (Array::slice.call(styles).join("").match(/-(moz|webkit|ms)-/) or (styles.OLink is "" and ["", "o"]))[1]
  dom = ("WebKit|Moz|MS|O").match(new RegExp("(" + pre + ")", "i"))[1]
  dom: dom
  lowercase: pre
  css: "-" + pre + "-"
  js: pre[0].toUpperCase() + pre.substr(1)
)()

@utils.initFormErrors = (t) ->
  for el in t.find('.error-form')
    do (el) ->
      utils._hideErrorForm(el)
  return

@utils.showErrorForm = (el) ->
  el.style.height = "20px"
  el.style.visibility = "visible"
  el.style.opacity = "1"
  el.style.padding = "5px"

@utils._hideErrorForm = (el) ->
  el.style.height = "0"
  el.style.visibility = "hidden"
  el.style.opacity = "0"
  el.style.padding = "0"
