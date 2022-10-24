(:~ Print the number of items listed on all continents. ~:)
<q1>{
    let $regions := doc("auction.xml")//regions/*/name()
    for 
        $region in $regions
    return (
        <region>
            <name>{$region}</name>
            {for 
                $item in doc("auction.xml")/site/regions/*[name()=$region]/item
            group by 
                doc("auction.xml")/site/regions/*[name()=$region]
            return (
                <items>{count($item)}</items>
            )}
        </region>
    )
}</q1>