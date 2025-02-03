<?php
header("Content-Type: text/plain");

$filename_adstxt_user = 'ads.txt';

$ads_txt = @file_get_contents($filename_adstxt_user);
$ads_txt_themoneytizer = file_get_contents('https://ads.themoneytizer.com/ads_txt.php?site_id=131290&id=121765');
if(empty($ads_txt_themoneytizer)){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, 'https://ads.themoneytizer.com/ads_txt.php?site_id=131290&id=121765');
    $ads_txt_themoneytizer = curl_exec($ch);
    curl_close($ch);
}

if(empty($ads_txt)){
    file_put_contents($filename_adstxt_user, $ads_txt_themoneytizer);
    chmod($filename_adstxt_user, 0777);

    //$ads_txt = file_get_contents($filename_adstxt_user);
}

$explode_ads_txt = explode("\n", $ads_txt);

$explode_ads_txt_themoneytizer = explode("\n", $ads_txt_themoneytizer);

$aAdsTxt = array();
$aAdsTxtThemoneytizer = array();

foreach ($explode_ads_txt as $k => $v) {
    $aAdsTxt[] = trim(str_replace(' ', '', $v));
}

foreach ($explode_ads_txt_themoneytizer as $k => $v) {
    $aAdsTxtThemoneytizer[] = trim(str_replace(' ', '', $v));
}

$merge_ads_txt = array_filter(array_unique(array_merge($aAdsTxtThemoneytizer, $aAdsTxt)));
foreach($merge_ads_txt as $k => $v){
    $merge_ads_txt[$k] = str_replace(',', ', ', $merge_ads_txt[$k]);
}

echo implode("\n", $merge_ads_txt);
        