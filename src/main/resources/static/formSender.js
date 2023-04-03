

function serializeForm(formNode) {
    console.log(`serialiazeForm method`)
    console.log(formNode.elements.item(0));
    // const { elements } = formNode
    //
    // Array.from(elements)
    //     .forEach((elements) => {
    //         const { name, value } = elements
    //         console.log({ name, value })
    //     })
}

function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(editForm)
}

