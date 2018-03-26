<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$query = "SELECT 
        plain_data.parlamentar_fantasia AS memberPoliticalName,
        plain_data.parlamentar_nome AS memberName,
        plain_data.parlamentar_partido AS memberParty,
        month_avg.despesa_media_mes AS monthAverageExpenses,
        SUM(despesa_valor) AS monthSumExpenses
    FROM
        cidadaofiscal.cf_alepe AS plain_data
    JOIN (
        SELECT 
            parlamentar_fantasia,
            AVG(despesa_soma_mes) AS despesa_media_mes
        FROM
            (SELECT 
                parlamentar_fantasia,
                SUM(despesa_valor) AS despesa_soma_mes
            FROM
                cidadaofiscal.cf_alepe
            GROUP BY
                parlamentar_fantasia,
                ordem_ano,
                ordem_mes) AS month_sum
        GROUP
            BY parlamentar_fantasia
    ) AS month_avg 
    ON month_avg.parlamentar_fantasia = plain_data.parlamentar_fantasia
    GROUP BY
        memberPoliticalName,
        memberParty
    ORDER BY
        monthSumExpenses DESC
    LIMIT
        0,100";

$stmt = $db->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();
 
if($num>0){
 
    $res_arr=array();
    $res_arr["data"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $res_arr_item=array(
            "memberPoliticalName" => $memberPoliticalName,
            "memberName" => $memberName,
            "memberParty" => $memberParty,
            "monthAverageExpenses" => $monthAverageExpenses,
            "monthSumExpenses" => $monthSumExpenses
        );
 
        array_push($res_arr["data"], $res_arr_item);
    }
 
    echo json_encode($res_arr);
}
 
else{
    echo json_encode(
        array("message" => "No results found.")
    );
}
?>