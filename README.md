# 누구를 위한 스터디?
## Overview

- [스터디 OverView 키노트](https://www.icloud.com/keynote/AwBWCAESEHu7TQGhPl8kV6PgsH6JmgcaKmEkl5rSmbo5wCeqZciK7kQU-ddjE57snf_FsTTHNdZxDDbbhvS0yvHNmwMCUCAQEEIDMkMkqQZXACAcdRiPhznJA-RRsroRm2Gnv-RemcS3fE#%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%E1%84%8B%E1%85%A9%E1%84%87%E1%85%A5%E1%84%87%E1%85%B2.key)
- 인터넷 서비스에서 필요한 통계를 이해하자
- 이해한 내용을 실제 서비스에 적용해보자
- 보다 편리하게 GA를 사용할 수 있도록 지원해주는 공개된 Lib를 찾아보고 스터디 하자 

# 스터디 내용
## 이론 스터디
Coursera 에서 진행되는 Marketing Analytics 강의를 수강함 
- [Digital Analytics for Marketing Professionals: Marketing Analytics in Theory](https://www.coursera.org/learn/marketing-analytics/outline)
- Google 에서 Admob, Double Click 등 상품을 서비스하는 OPG 그룹의 임원이 강의함 
- 개론부터 ZMOT 등 최신 트랜드까지 개념을 정의함

### 이론 스터디 방법
- 강의는 개인이 알아서 청강
- 집합 스터디에서는 [박주형](dusskapark@gmail.com) 이 내용을 짧게 요약해서 전달함. 
- 전달한 내용은 Github에 공지함

## 기술 스터디
### Rake And Shuttle 스터디
1. Sentinel 은 로그를 정의하고 관리하는 서비스 입니다.
    1. 사전에 MMI에서 필요한 로그를 정의하고 수집하고자 하는 타입/내용/태그 등을 정의합니다.
    2. Sentinel 서버 및 관련 처리 시스템은 SK플래닛에서 자체 개발한 것입니다. 
1. Rake는 로그 수집 라이브러리 입니다.
    2. Sentinel 에서 정의된 로그에 따라서 앱내에서 수집된 로그를 저장 및 JSON 포멧으로 SK플래닛 DAS그룹의 RAKE 서버로 쏴줍니다. (이 과정에서 Shuttle 이라는 라이브러리가 사용되는듯)
1. SK플래닛의 경우 이렇게 이렇게 전달된 로그를 사내 솔루션인 Hive 등에서 사용하며 1000만 쿼리를 넘지 않는 선에서 샘플링한 데이터를 Measurement Protocol 로 GA로 쏴줍니다.
(즉, RAKE를 적용한다고 제한이 풀리거나 그러지는 않습니다.;)

1. RAKE와 Shuttle 클라이언트는 오픈소스인 mixpanel 를 기반으로 만들었으며, mixpanel의 라이선스 장책(Apache V2)에 따라서.. 현재 깃허브에도 라이브러리, 도큐먼트, 샘플앱이 공개되어 있습니다. 
(https://github.com/lonslonz/rakedocument/wiki/Rake-manual)
 
### Measurement Protocol 스터디
- 원래는 POS 등 인터넷에 연결된 Device에서 GA로 로그를 전달하기 위해서 만들어진 규격
- 현재는 Web-App 등을 하나의  Property / Session 에서 볼 수 있도록 하는 Universal Analytics의 기본 규격으로 활용됨 
 - 예를 들어, T store 처럼 1) 웹에서 다운로드 클릭 2) App이 실행돼서 다운로드 / 설치  등 복잡한 Flow가 있는 경우, Measurement 프로토콜로 앱/웹을 연동하는 것이 중요
- 참고: [UA 플랫폼 설명](https://developers.google.com/analytics/devguides/platform/)

 ![GA > UA 업그레이드 센터의 설명도](https://developers.google.com/analytics/images/platform/platformOverview.png)  

