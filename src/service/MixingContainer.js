const ALERT_LEVEL = 0.05;

export class MixingContainer {

    constructor(ingredients) {
        this.coffeeLevel = ingredients.currentCoffeeLevel;
        this.sugarLevel = ingredients.currentSugarLevel;
        this.milkLevel = ingredients.currentMilkLevel;

        this.onIngredientsAddedHandler = () => {
        };


        this.sendInfo = () => {
            // console.log("No info handler defined")
        };

        // this.sendWarning = () => {
        // //     console.log("No warning handler defined")
        // };
        //
        // this.sendCriticalAlert = () => {
        // //     console.log("No critical alert handler defined")
        // };
    }


    onIngredientsAdded(handler) {
        this.onIngredientsAddedHandler = handler;
    }


    sendInfoHandler(handler) {
        this.sendInfo = handler;
    }


    // sendWarningHandler(handler) {
    //     this.sendWarning = handler;
    // }
    //
    //
    // sendCriticalAlertHandler(handler) {
    //     this.sendCriticalAlert = handler;
    // }

    makeCoffee(coffeeObject) {

        const ingredients = coffeeObject.ingredients;

        const newCoffeeLevel = this.coffeeLevel - ingredients.coffee;
        const newSugarLevel = this.sugarLevel - ingredients.sugar;
        const newMilkLevel = this.milkLevel - ingredients.milk;

        // if (newCoffeeLevel < 0) {
        //     this.sendCriticalAlert('No coffee left')
        // } else if (newSugarLevel < 0) {
        //     this.sendCriticalAlert('No sugar left')
        // } else if (newMilkLevel < 0) {
        //     this.sendCriticalAlert('No milk left')
        // } else {

            setTimeout(() => {
                let remainingIngredients = {
                    currentCoffeeLevel: newCoffeeLevel,
                    currentSugarLevel: newSugarLevel,
                    currentMilkLevel: newMilkLevel
                };
                this.onIngredientsAddedHandler(remainingIngredients);

                // console.log("Ingredients added to mixing container");
                // console.log("Pouring water started");


                setTimeout(() => {

                    // console.log("Water pouring completed");
                    this.sendInfo("Water pouring completed");

                    setTimeout(() => {

                        // console.log("Process completed");
                        this.sendInfo("Process completed");
                        alert("You can now take your coffee");
                        window.location.reload();

                        // this.onCompletedCallback()
                    }, 1000)

                }, 6000)

            }, 2000)

        // }

    }

}

