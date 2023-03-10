## Constraints
Note that some of the constraints stated here may due to server side rendering or incomplete documention (as in it was not mentioned)
- cannot use JavaScript alert
- cannot use global variables
- cannot use hooks
- cannot use other libraries to show popout such as sweetalert

## Weird stuff
- if use Checkout::actions::RenderBefore , it will end up rendering in every step due to each step has a space for this API option. (Render in Information, shipping and even payment step)