<%@page import="intt.FinInttCommonUtil"%>
<%@page import="java.net.NetworkInterface"%>
<%@page import="java.net.InetAddress"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.net.SocketException"%>
<%@page import="fintech.client.net.NetManager"%>
<%@page import="fintech.client.net.NetClient"%>
<%@page import="com.extrus.exafe.ota.client.api.OTAClientApiManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="./js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="./js/json2.js"></script>
<script type="text/javascript" src="js/sample.formValidation.js"></script>
<link rel="stylesheet" type="text/css" href="css/common.css"/>

<title>입금이체</title>

<script language="javascript">

	/*
	 $(document).ready(function(){

	 });
	 */

	var IsTuno = ""; // 기관거래고유번호
	var Tsymd = ""; // 전송일자
	var Trtm = ""; // 전송시각

	//날짜 및 시간 정보 구하기
	function getDateFormat(){

		var date = new Date();

		var year = date.getFullYear(); // 연도
		var month = new String(date.getMonth()+1); // 월
		var day = new String(date.getDate()); // 일
		var hour = new String(date.getHours()); // 시
		var minute = new String(date.getMinutes()); // 분
		var second = new String(date.getSeconds()); // 초
		var mlSecond = new String(date.getMilliseconds());

		// 구한 값들이 10보다 작으면 숫자 앞에 "0"을 추가한다.
		if(month < 10){
			month = "0" + month;
		}

		if(day < 10){
			day = "0" + day;
		}

	    if(hour < 10){
	    	hour = "0" + hour;
		}

		if(minute < 10){
			minute = "0" + minute;
		}

	    if(second < 10){
	    	second = "0" + second;
		}

	    // 기관거래고유번호, 일자, 시간 setting
	    IsTuno = year + month + day + hour + minute + second + mlSecond +"001";
		Tsymd = year + month + day;
		Trtm  = hour + minute + second;
	}

	//OTA 클라이언트 호출
	function sendServer(sendData) {

		var jsonData = sendData;
		var fintechApsno = JSON.parse(jsonData).Header.FintechApsno;
		jsonData = encodeURIComponent(jsonData).replace(/\"/g, "%22").replace(/\'/g, "%27");

		$.ajax({
			url : "process.jsp?p=send&fintechApsno=" + fintechApsno,
			type : "POST",
			data : "JSONData=" + jsonData,
			cache : false,
			success : function(result) {

				// alert(result.trim());

				// Json 파싱
				var resultData = JSON.parse(result);

				// 정상 응답을 받았을 경우 처리
				if (resultData.Header.Rpcd == "00000") {

					if (resultData.Header.ApiNm == "InquireBalance") {

						// 잔액조회 전문 호출 후 잔액 출력
						var form = document.depositForm;
						form.balance.value = parseInt(resultData.RlpmAbamt);

					} else {

						alert("요청하신 거래가 정상적으로 완료되었습니다.");
						inqBalance();

						// 입금이체 결과확인 API 호출 시 필요한 Input 값 전달
						var form = document.depositForm;

						form.orderFinAcno.value = form.FinAcno.value // 핀-어카운트
						form.orderTram.value = form.Tram.value // 거래금액
						form.orderTsymd.value = resultData.Header.Tsymd // 거래일자
						form.orderIsTuno.value = resultData.Header.IsTuno // 원거래 기관거래고유번호

						window.open("", "depositPopup", "width = 300, height = 250, scrollbars = yes, resizable = yes");
						form.method = "post";
						form.target = "depositPopup";
						form.action = "depositPop.jsp";
						form.submit();

					}

			    // 오류 응답을 받았을 경우 처리
				} else {

					alert("응답코드 : " + resultData.Header.Rpcd + "\n" + "응답메세지 : " + resultData.Header.Rsms);

				}
			},
			error : function() {

				alert("ajax error");

			}
		});
	}

	// 잔액조회
	function inqBalance() {

		var form = document.depositForm;
		var FinAcno = form.FinAcno.value;

		if (FinAcno == "") {

			alert("입금계좌(핀-어카운트)를 입력해주시기 바랍니다.");

		} else {

			getDateFormat();

			// 잔액조회 전문
			var inputJson = "";
			inputJson += '{';
			inputJson += '\n "Header" : {';
			inputJson += '\n   "ApiNm" : "InquireBalance",'; // API 명
			inputJson += '\n   "Tsymd" : "' + Tsymd + '",'; // 전송일자
			inputJson += '\n   "Trtm" : "' + Trtm + '",'; // 전송시각
			inputJson += '\n   "Iscd" : "000023",'; // 기관코드
			inputJson += '\n   "FintechApsno" : "001",'; // 핀테크앱일련번호
			inputJson += '\n   "ApiSvcCd" : "03Q_004_F0",'; // API서비스코드
			inputJson += '\n   "IsTuno" : "' + IsTuno + '"'; // 기관거래고유번호
			inputJson += '\n },';
			inputJson += '\n "FinAcno" : "' + FinAcno + '"'; // 핀-어카운트
			inputJson += '\n }';

			sendServer(inputJson);

		}

	}

	// 환불(입금이체)
	function doRefund() {

		var form = document.depositForm;

		var FinAcno = form.FinAcno.value; // 핀-어카운트
		var Tram = form.Tram.value; // 거래금액
		var balance = form.balance.value; // 잔액

		if (FinAcno == "") {

			alert("입금계좌(핀-어카운트)를 입력해주시기 바랍니다.");
			return false;

		} else if (balance == "") {

			alert("잔액을 확인해주시기 바랍니다.");
			return false;

		} else if (isNaN(FinAcno)) {

			alert("숫자만 입력해주세요.");
			return false;

		} else if (FinAcno.length < 29) {

			alert("입금계좌(핀-어카운트) 길이 오류");
			return false;

		}else {

			getDateFormat();

			// 입금이체 전문
			var inputJson = "";
			inputJson += '{';
			inputJson += '\n "Header" : {';
			inputJson += '\n   "ApiNm" : "ReceivedTransferFinAccount",'; // API명
			inputJson += '\n   "Tsymd" : "' + Tsymd + '",'; // 전송일자
			inputJson += '\n   "Trtm" : "' + Trtm + '",'; // 전송시각
			inputJson += '\n   "Iscd" : "000023",'; // 기관코드
			inputJson += '\n   "FintechApsno" : "001",'; // 핀테크앱일련번호
			inputJson += '\n   "ApiSvcCd" : "02M_001_00",'; // API서비스코드
			inputJson += '\n   "IsTuno" : "' + IsTuno + '"'; // 기관거래고유번호
			inputJson += '\n },';
			inputJson += '\n "FinAcno" : "' + FinAcno + '",'; // 핀-어카운트
			inputJson += '\n "Tram" : "' + Tram + '",'; // 거래금액
			inputJson += '\n "DractOtlt" : "약정출금계좌명",'; // 출금계좌인자내용
			inputJson += '\n "MractOtlt" : "입금계좌적요내용"'; // 입금계좌인자내용
			inputJson += '\n }';

			sendServer(inputJson);

		}

	}
</script>

</head>

<body>

	<h1 class="hType00">DAY.1 - 입금이체</h1>

	<form name="depositForm">

		<br><br>

		제품 : 가습기 <br><br>

	    금액 : <input type=text id="Tram" name="Tram" value="10" style="text-align:right;width:10%">&nbsp원 <br><br>

	    입금계좌(핀-어카운트) : <input type=text id="FinAcno" name="FinAcno" size="10" maxlength="29" value="" style="width:25%"> <br><br>

	    잔액 : <input type=text id="balance" name="balance" size="10" value="0"  disabled="true" style="text-align:right;width:10%">&nbsp원 <input type=button value="조회" onclick="inqBalance()"> <br><br>

		환불 하시겠습니까? <br><br>

		<input type=button value="환불" onclick="doRefund()">

		<!-- 입금이체 결과확인 API 호출 시 필요한 Input 값 -->
		<input type="hidden" id="" name="orderFinAcno" value="">
		<input type="hidden" id="" name="orderTram" value="">
		<input type="hidden" id="" name="orderTsymd" value="">
		<input type="hidden" id="" name="orderIsTuno" value="">

	</form>

</body>

</html>
