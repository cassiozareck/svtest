# svtest
Own personal project just for learning purposes.
Testing [relative_link](folder/test.md)

Those new 4 keploy features will of course be amazing for new-comers as they will can run separate tests which is useful for debug (keploy run), get informations about tests (keploy get), they will have a help option which will display what those commands does and also no need more for set environment variables anymore as there is now keploy record and keploy run-all which is very intuitive. 
To perform it lets begin by how to implement the get feature. 
We can implement this feature by making a connection between it and the keploy folder where tests and mocks are stored, so when the user type keploy get test-xx.yaml it will print out this exactly test and its mocks connection to. As a big project can have a lot of tests and may want to perform some automations with the keploy get we need performance while trying to find a test, we can use hash map to 






