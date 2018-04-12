<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$type=isset($_GET["type"]) ? $_GET["type"] : "";
$limit=isset($_GET["limit"]) ? intval($_GET["limit"]) : 5;
$offset=isset($_GET["offset"]) ? intval($_GET["offset"]) : 0;

if (strlen($type) > 0) {
    $query="SELECT 
    plain_data.fornecedor_id AS supplierId,
    plain_data.fornecedor_nome AS supplierName,
    SUM(plain_data.despesa_valor) AS sumExpenses,
    COUNT(DISTINCT plain_data.parlamentar_fantasia) AS memberCount
FROM
    cidadaofiscal.cf_alepe AS plain_data
WHERE
    plain_data.despesa_tipo = " . $type . " AND 
    plain_data.despesa_cancelada = 0
GROUP BY
    plain_data.fornecedor_nome
LIMIT
    " . $offset . "," . $limit;    
    
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $num = $stmt->rowCount();
    
    if($num>0){
     
        $res_arr=array();
        $res_arr["data"]=array();
     
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
     
            $res_arr_item=array(
                "supplierId" => $supplierId,
                "supplierName" => $supplierName,
                "sumExpenses" => $sumExpenses,
                "memberCount" => $memberCount
            );
     
            array_push($res_arr["data"], $res_arr_item);
        }
     
        echo json_encode($res_arr);
    }
     
    else{
        echo json_encode(
            array("message" => "No results found." . $query)
        );
    }
} 
else{
    echo json_encode(
        array("message" => "Parameter 'type' is mandatory.")
    );
}

?>