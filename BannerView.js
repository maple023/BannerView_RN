/**
 * Created by happi on 2017/3/26.
 */


import React,{ Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,

} from 'react-native';


//引入定时器
var TimerMixin = require('react-timer-mixin');



export default class BannerView extends  Component {
    //注册定时器
    mixins:[TimerMixin];

    constructor(props) {
        super(props);

        var title = null;
        if (this.props.images) {
            title = this.props.images[0].title;
        }

        this.state = {
            currentPage:0,
            currentTitle:title,
        }
    }


    //初始化常量
    static defaultProps={
        //时间间隔  单位 毫秒
        duration:3000
    }

    render () {
        return (
            <View style={{height:this.props.height,width:this.props.width}}>
                <ScrollView style={{height:this.props.height,width:this.props.width}}
                            ref="scrollView"
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            //一帧动画结束之后!!
                            onMomentumScrollEnd={(e)=>this.onScrollAnimationEnd(e)}
                            onScrollBeginDrag={()=>this.scrollBeginDrag()}
                            onScrollEndDrag={()=>this.startTimer()}>
                    {this.renderAllImage()}
                </ScrollView>

                {/*指示器*/}
                <View style={[styles.pageViewStyle ,{width:this.props.width}]}>
                    <Text style={{color:'#F5FCFF'}}>{this.state.currentTitle}</Text>
                    <View style={styles.pageViewStyle1}>
                        {this.renderPage()}
                    </View>
                </View>
            </View>
        )
    }

    //UI加载完毕
    componentDidMount () {
        //开启定时器
        this.startTimer();
    }

    //开启定时器
    startTimer(){
        if (this.props.images) {
            //1.拿到定时器
            var scrollView = this.refs.scrollView;
            var imgCount = this.props.images.length;
            var obj = this;

            //2.设置定时器
            this.timer = setInterval(function () {
                //2.1 设置当前页
                var currentPage = 0;
                //2.2判断
                if ((obj.state.currentPage + 1) >= imgCount) {
                    currentPage = 0;
                } else {
                    currentPage = obj.state.currentPage + 1;
                }

                //2.3更新状态机
                obj.setState({
                    currentPage: currentPage,
                    currentTitle:obj.props.images[currentPage].title
                });
                //2.4滚起来
                var offsetX = currentPage * obj.props.width;
                scrollView.scrollTo({x: offsetX, y: 0, animated: true});

            }, this.props.duration);
        }
    }

    //开始拖拽
    scrollBeginDrag() {
        //清楚定时器
        clearInterval(this.timer);
    }

    //滚动完毕
    onScrollAnimationEnd (e) {
        //1.拿到偏移量
        var offsetX = e.nativeEvent.contentOffset.x;
        //2.求出当前第几页
        var currentPage = Math.floor(offsetX/this.props.width);
        //3.更新状态机
        this.setState({
            currentPage:currentPage,
            currentTitle:this.props.images[currentPage].title
        });
    }

    //加载所以的图片
    renderAllImage() {
        var allImage = [];
        //拿到图片数据
        var imgsArr = this.props.images;
        if (imgsArr) {
            //遍历
            for (var i=0;i<imgsArr.length;i++) {
                //取出单个图片的数据!
                var imgItem = imgsArr[i];
                //创建图片组件到数组里面
                allImage.push(
                    <Image key={i} source={{uri:imgItem.img}} style={{width:this.props.width,height:this.props.height}}/>
                )
            }
        }
        return allImage;
    }

    //返回指示器
    renderPage() {
        var style;
        var pageArr = [];
        var imgsArr = this.props.images;
        if (imgsArr) {
            for (var i=0;i<imgsArr.length;i++) {
                style = (i==this.state.currentPage)?{color:'orange'}:{color:'#ffffff'};
                pageArr.push(
                    <Text key={i}
                          style={[{fontSize:25},style]} >
                        &bull; </Text>
                )
            }
        }
        return pageArr;
    }

}


const styles = StyleSheet.create({
    pageViewStyle:{
        height:25,
        backgroundColor:'rgba(0,0,0,0.2)',
        //定位
        position:'absolute',
        bottom:0,
        //主轴方向
        flexDirection:'row',
        //justifyContent:'flex-end',
        justifyContent:'space-between',
        alignItems:'center'
    },
    pageViewStyle1:{
        height:25,
        //主轴方向
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    }

});

//输出一个组件
module.exports = BannerView;