<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();


$conditionItems = "";
$conditionItems .= isset($_GET["memberPoliticalName"]) ? " AND parlamentar_fantasia = '" . $_GET["memberPoliticalName"] . "'" : "";
$conditionItems .= isset($_GET["memberParty"]) ? " AND parlamentar_partido = '" . $_GET["memberParty"] . "'" : "";
$conditionItems .= isset($_GET["poYearFrom"]) ? " AND ordem_ano >= " . $_GET["poYearFrom"] : "";
$conditionItems .= isset($_GET["poYearTo"]) ? " AND ordem_ano <= " . $_GET["poYearTo"] : "";
$conditionItems .= isset($_GET["poMonthFrom"]) ? " AND ordem_mes >= " . $_GET["poMonthFrom"] : "";
$conditionItems .= isset($_GET["poMonthTo"]) ? " AND ordem_mes <= " . $_GET["poMonthTo"] : "";
$conditionItems .= isset($_GET["supplierId"]) ? " AND fornecedor_id <= '" . $_GET["supplierId"] . "'" : "";
$conditionItems .= isset($_GET["supplierName"]) ? " AND fornecedor_nome = '" . $_GET["supplierName"] . "'" : "";
$conditionItems .= isset($_GET["expenseType"]) ? " AND despesa_tipo = " . $_GET["expenseType"] : "";
$conditionItems .= isset($_GET["expenseValueFrom"]) ? " AND despesa_valor >= " . $_GET["expenseValueFrom"] : "";
$conditionItems .= isset($_GET["expenseValueTo"]) ? " AND despesa_valor <= " . $_GET["expenseValueTo"] : "";
$conditionItems .= isset($_GET["expenseCanceled"]) ? " AND despesa_cancelada = " . $_GET["expenseCanceled"] : "";

$query = "SELECT 
    res_by_type.despesa_tipo AS expenseType,
    sum(y2015) as y2015,
    sum(y2016) as y2016,
    sum(y2017) as y2017,
    sum(despesa_valor) AS total
    FROM (
        SELECT 
        despesa_tipo,
        despesa_valor,
        CASE(ordem_ano) WHEN (2015) THEN despesa_valor ELSE 0 END AS y2015,
        CASE(ordem_ano) WHEN (2016) THEN despesa_valor ELSE 0 END AS y2016,
        CASE(ordem_ano) WHEN (2017) THEN despesa_valor ELSE 0 END AS y2017
        FROM
        cidadaofiscal.cf_alepe";

if (strlen($conditionItems)>0) {
    $query .= " WHERE " . substr($conditionItems, 5);
}

$query .= ") AS res_by_type
    GROUP BY
        expenseType
    ORDER BY 
        total DESC";

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
            "y2015" => $y2015,
            "y2016" => $y2016,
            "y2017" => $y2017,
            "total" => $total
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
