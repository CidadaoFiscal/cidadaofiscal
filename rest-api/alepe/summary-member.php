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


$query = "
SELECT 
    plain_data.parlamentar_fantasia AS memberPoliticalName,
    plain_data.parlamentar_nome AS memberName,
    plain_data.parlamentar_partido AS memberParty,
    periodo_qtd AS periodCount,
    SUM(plain_data.despesa_valor) AS monthSumExpenses
FROM
    cidadaofiscal.cf_alepe AS plain_data,
	(SELECT 
        parlamentar_fantasia,
        
        COUNT(DISTINCT periodo) as periodo_qtd,
        SUM(despesa_soma_mes) AS despesa_media_mes
    FROM
        (SELECT 
            parlamentar_fantasia,
            concat(ordem_ano, ordem_mes,parlamentar_fantasia) AS periodo,
            SUM(despesa_valor) AS despesa_soma_mes
        FROM
            cidadaofiscal.cf_alepe
            GROUP BY
            parlamentar_fantasia,
            periodo) AS month_sum    	
    GROUP
        BY parlamentar_fantasia
	) AS month_avg
WHERE
	month_avg.parlamentar_fantasia = plain_data.parlamentar_fantasia";

if (strlen($conditionItems)>0) {
    $query .= $conditionItems;
}

$query .= " 
GROUP BY
    memberPoliticalName,
    memberParty
ORDER BY
    monthSumExpenses DESC";

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
            "periodCount" => $periodCount,
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