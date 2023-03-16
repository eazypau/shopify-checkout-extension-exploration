## Constraints
Note that some of the constraints stated here may due to server side rendering or incomplete documention (as in it was not mentioned)
- cannot use JavaScript alert
- cannot use global variables
- cannot use hooks
- cannot use other libraries to show popout such as sweetalert
- one extension can only have one extension point (?)

## Weird stuff
- if use Checkout::actions::RenderBefore , it will end up rendering in every step due to each step has a space for this API option. (Render in Information, shipping and even payment step)

## Accessing metafield values
- it has to be from the created variable that is using the useMetaField API

## Creating checkout extension
- each app is limited to 5 extension
- we can only create 1 block for each section due to it will use as drag and drop at the checkout UI dashboard

## Drag and Drop at Checkout UI Dashboard
- it is only allowed to slot in based on the desired locatoin