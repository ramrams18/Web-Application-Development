(:~ List the names of persons and the names of the items they bought in Europe. ~:)
<q6>{
    for 
        $auction in doc("auction.xml")//closed_auctions/closed_auction,
        $item in doc("auction.xml")//regions/europe/item,
        $person in doc("auction.xml")//people/person
    where
        $auction/buyer/@person = $person/@id
        and 
        $auction/itemref/@item = $item/@id
    group by
        $person/@id
    return(
        <person>
            {$person/name}
            <items>
                {$item/name}
            </items>
        </person>
    )
}</q6>