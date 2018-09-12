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
$conditionItems .= isset($_GET["expenseDateFrom"]) ? " AND despesa_data >= '" . $_GET["expenseDateFrom"] . "'" : "";
$conditionItems .= isset($_GET["expenseDateTo"]) ? " AND despesa_data <= '" . $_GET["expenseDateTo"] . "'" : "";

$orderByValue = isset($_GET["orderByValue"]) ? $_GET["orderByValue"] : "despesa_data";
$orderByOrder = isset($_GET["orderByOrder"]) ? $_GET["orderByOrder"] : "ASC";


$limit=isset($_GET["limit"]) ? intval($_GET["limit"]) : 5;
$offset=isset($_GET["offset"]) ? intval($_GET["offset"]) : 0;

    $query="SELECT
	parlamentar_fantasia AS memberPoliticalName,
	parlamentar_partido AS memberParty,
	parlamentar_nome AS memberName,
	ordem_ano AS poYear,
	ordem_mes AS poMonth,
    fornecedor_id AS supplierId,
    fornecedor_nome AS supplierName,
	despesa_tipo AS expenseType,
	despesa_valor AS expenseValue,
	despesa_cancelada AS expenseCanceled,
    despesa_data AS expenseDate
FROM
    cf_alepe";

if (strlen($conditionItems)>0) {
    $query .= " WHERE " . substr($conditionItems, 5);
}

$query .= " ORDER BY " . $orderByValue . " " . $orderByOrder;
$query .= " LIMIT " . $offset . "," . $limit;    
    
    
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
            "memberParty" => $memberParty,
            "memberName" => $memberName,
            "poYear" => $poYear,
            "poMonth" => $poMonth,
            "supplierId" => $supplierId,
            "supplierName" => $supplierName,
            "expenseType" => $expenseType,
            "expenseValue" => $expenseValue,
            "expenseCanceled" => $expenseCanceled,
            "expenseDate" => $expenseDate
        );
    
        array_push($res_arr["data"], $res_arr_item);
    }
    echo json_encode($res_arr);
}
    
else{
    echo json_encode(
        array(
            "message" => "No results found.",
            "errorInfo" => $stmt->errorInfo(),
            "query" => $query
        )
    );
}

?>