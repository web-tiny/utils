/*
 * @Author: Tiny
 * @Date: 2019-06-12 16:37:20
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-06-12 17:35:24
 */

// 将ES7的Decorator应用在数据定义层，实现类型检查，字段映射等功能
class CarModel extends BaseModel {
  @observable
  @Check(CheckType.Number)
  @Unit(UnitType.PRICE_UNIT_WY)
  price = 0

  @observable
  @Check(CheckType.String)
  @ServerName('seller_name')
  sellerName = ''
}

function CheckerDecorator (type) {
  return (target, name, descriptor) => {
    let v = descriptor.initializer && descriptor.initializer.call(this)
    return {
      eumerable: true,
      configurable: true,
      get: () => {
        return v
      },
      set: c => {
        let cType = typeof(c)
        v = c
      }
    }
  }
}