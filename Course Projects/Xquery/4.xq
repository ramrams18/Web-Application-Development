(:~ List all persons according to their interest (ie, for each interest category, display the persons on that category). ~:)
<q4>{
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
        <people>{$person/name}</people>
    </category>)
}</q4>