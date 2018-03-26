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
        plain_data.despesa_tipo AS expenseType,
        SUM(plain_data.despesa_valor) AS sumExpenses,
        plain_data.ordem_ano AS poYear
    FROM
        cidadaofiscal.cf_alepe AS plain_data	
    GROUP BY
        expenseType,
        poYear
    ORDER BY 
        poYear ASC";

$stmt = $db->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();
 
if($num>0){
 
    $res_arr=array();
    $res_arr["data"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $res_arr_item=array(
            "expenseType" => $expenseType,
            "sumExpenses" => $sumExpenses,
            "poYear" => $poYear
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