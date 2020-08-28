package com.o2o.action.server.rest;

import com.o2o.action.server.app.Main;
import com.o2o.action.server.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.util.concurrent.ExecutionException;

@RestController
public class testController implements Serializable {
    private static final Logger LOGGER = LoggerFactory.getLogger(testController.class);
    private final Main main;

    //@Autowired
    //private CategoryRepository categoryRepository;

    public testController() {
        main = new Main();
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public @ResponseBody
    String processActions(@RequestBody String body, HttpServletRequest request,
                          HttpServletResponse response) {
        String jsonResponse = null;
        try {

            LOGGER.info("\n###request : {}", body);
            jsonResponse = main.handleRequest(body, CommonUtil.getHttpHeadersMap(request)).get();
            LOGGER.info("\n###response : {}", jsonResponse);
            System.out.println("------------------------end of conversation------------------------");

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return jsonResponse;
    }

    //sendTxQuery
//    @RequestMapping(value = "/test/canvasapp/{_parameter}", method = RequestMethod.GET)
//    public @ResponseBody
//    String CanvasParameter(@PathVariable String _parameter) {
//        System.out.println("recvquery from testController " + _parameter);
//        String parameter = _parameter;
//        Main main = new Main();
//        main.sendTxQuery(parameter);
//        return parameter;
//    }
}