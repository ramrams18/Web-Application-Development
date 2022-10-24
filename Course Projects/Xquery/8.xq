(:~ List the reserve prices of those open auctions where a certain person with id person3 issued a bid before another person with id person6. (Here before means "listed before in the XML document", that is, before in document order.) ~:)
<q8>{
    for 
        $auction in doc("auction.xml")//open_auction

        let $person_3 := index-of(doc("auction.xml")//open_auction/$auction/bidder/personref/@person, "person3")
        let $person_6 := index-of(doc("auction.xml")//open_auction/$auction/bidder/personref/@person, "person6")
        
        return ({
                if($person_3 < $person_6) 
                    then ($auction/reserve) 
                else ()
        })
}</q8>