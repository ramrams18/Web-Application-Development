(:~ List the names of persons and the number of items they bought. ~:)
<q3>{
    for 
        $auction in doc("auction.xml")//closed_auctions/closed_auction,
        $person in doc("auction.xml")//people/person
    where
        $auction/buyer/@person = $person/@id
    group by 
        $person/@id
    return (
        <person>
            {$person/name}
            <items>{count($auction)}</items>
        </person>
    )
}</q3>