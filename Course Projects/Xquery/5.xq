(:~ Group persons by their categories of interest and output the size of each group. ~:)
<q5>{
for 
    $cat in doc("auction.xml")//categories/category, 
    $person in doc("auction.xml")//people/person
where 
    $cat/@id = $person/profile/interest/@category
group by 
    $cat/@id
return 
    (<category id ="{$cat/@id}">
        {$cat/name}
        <people>{count($person)}</people>
    </category>)
}</q5>