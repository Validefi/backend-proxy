function filterTransaction(description = '') {
    if (
        description.includes(' more ') ||
        description.includes('Cake-LP') ||
        description.includes(' more')
    ) {
        return {
            skipped: true,
        };
    } else if ((description.match(/and/g) || []).length) {
        return {
            skipped: true,
        };
    }

    const [string_before, string_after] = description.split('for');
    // const coins_before =
}

/*
def fn(description): #only send swap transactions' description

    k=0
    #1st if block
	if(description contains " more " or "Cake-LP" or " more"):

      #to skip transactions with incomplete data

      skip
      #skip this transaction, no use
      #1st if block ends



    elif("count the number of 'and' in description">=2):
      #to skip transactions with multiple swaps
      skip


    #now split the description into 2 strings, one before the word "for" and one after that.


    string_before = "string in description before the word for"
    string_after = "string in description after the word for"

    #now extract the coin and value information from the above
    coins_before = extract_coins_from_string_before
    value_before = extract_value_from_string_before
    coins_after = extract_coins_from_string_after
    value_after = extract_value_from_string_after



    #2nd if block
    elif(coins_before contains {"USDT" or "BUSD" or "USDC" or "UST"} AND coins_after contains {"USDT" or "BUSD" or "USDC" or "UST"}):

       #this is a stablecoin to stablecoin swap and hence ignore.

       skip

       #2nd if block ends

    #3rd if block
    elif(coins_before == coins_after):

       #this is a wrong swap output and hence ignore.

       skip

       #3rd if block ends

    #4th if block
    elif(value_before or value_after == 0.00):

       #this is a wrong swap output and hence ignore.

       skip

       #4th if block ends

    else:

      #fetch current coin values from db for all coins involved in the transaction.
      curr_coins_before = "query the db and fetch current value of the before coin in db"
      curr_coins_after = "query the db and fetch current value of the after coin in db"

      #Now time to update the db for coin values

      #if(coins_before[1]==None): #single swap detected!

        #single swap function
        k= swap_handle_single(coins_before[0], value_before[0], coins_after[0], value_after[0], curr_coins_before[0], curr_coins_after[0])

     if(k==1):
       print("Success!")
     elif(k==0):
       print("Skipped!")
     elif(k!=1 and k!=0):
       print("Failed to update the value!")
*/
