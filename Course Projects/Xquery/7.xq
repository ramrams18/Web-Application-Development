(:~ Give an alphabetically ordered list of all items along with their location. ~:)
<q7>{
    for 
        $item in doc("auction.xml")//item
    order by
        $item/name 
    return (
        <item>
            {$item/name}
            {$item/location}
        </item>
    )
}</q7>