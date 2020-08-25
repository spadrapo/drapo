using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Reflection;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    [JsonConverter(typeof(DrapoObjectConverter))]
    public class DrapoObject : DynamicObject, IDynamicMetaObjectProvider
    {
        //Fields
        private object _instance;
        private Type _instanceType;
        private PropertyInfo[] _instancePropertyInfo;
        private Dictionary<string, object> _properties = new Dictionary<string, object>();
        //Properties
        public Dictionary<string, object> Properties { get => _properties; }

        private PropertyInfo[] InstancePropertyInfo
        {
            get
            {
                if (_instancePropertyInfo == null && _instance != null)
                    _instancePropertyInfo = _instance.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
                return (_instancePropertyInfo);
            }
        }

        public DrapoObject()
        {
            Initialize(null);
        }

        public DrapoObject(object instance)
        {
            Initialize(instance);
        }

        protected virtual void Initialize(object instance)
        {
            _instance = instance;
            if (instance != null)
                _instanceType = instance.GetType();
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            result = null;
            if (_properties.ContainsKey(binder.Name))
            {
                result = _properties[binder.Name];
                return (true);
            }
            if (_instance != null)
            {
                try
                {
                    return GetProperty(_instance, binder.Name, out result);
                }
                catch { }
            }
            result = null;
            return (false);
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            if (_instance != null)
            {
                try
                {
                    bool result = SetProperty(_instance, binder.Name, value);
                    if (result)
                        return (true);
                }
                catch { }
            }
            _properties[binder.Name] = value;
            return (true);
        }

        public override bool TryInvokeMember(InvokeMemberBinder binder, object[] args, out object result)
        {
            if (_instance != null)
            {
                try
                {
                    if (InvokeMethod(_instance, binder.Name, args, out result))
                        return (true);
                }
                catch { }
            }
            result = null;
            return (false);
        }

        protected bool GetProperty(object instance, string name, out object result)
        {
            if (instance == null)
                instance = this;
            var memberInfos = _instanceType.GetMember(name, BindingFlags.Public | BindingFlags.GetProperty | BindingFlags.Instance);
            if (memberInfos != null && memberInfos.Length > 0)
            {
                var memberInfo = memberInfos[0];
                if (memberInfo.MemberType == MemberTypes.Property)
                {
                    result = ((PropertyInfo)memberInfo).GetValue(instance, null);
                    return (true);
                }
            }
            result = null;
            return (false);
        }

        protected bool SetProperty(object instance, string name, object value)
        {
            if (instance == null)
                instance = this;
            Type type = instance.GetType();
            PropertyInfo propertyInfo = type.GetProperty(name);
            if (propertyInfo == null)
                return (false);
            Type propertyType = propertyInfo.PropertyType;
            var targetType = IsNullableType(propertyType) ? Nullable.GetUnderlyingType(propertyType) : propertyType;
            if (value != null)
                value = Convert.ChangeType(value, targetType);
            propertyInfo.SetValue(instance, value, null);
            return (true);

        }

        private static bool IsNullableType(Type type)
        {
            return ((type.IsGenericType) && (type.GetGenericTypeDefinition().Equals(typeof(Nullable<>))));
        }

        protected bool InvokeMethod(object instance, string name, object[] args, out object result)
        {
            if (instance == null)
                instance = this;
            var memberInfos = _instanceType.GetMember(name, BindingFlags.InvokeMethod | BindingFlags.Public | BindingFlags.Instance);
            if (memberInfos != null && memberInfos.Length > 0)
            {
                var memberInfo = memberInfos[0] as MethodInfo;
                result = memberInfo.Invoke(_instance, args);
                return (true);
            }
            result = null;
            return (false);
        }

        public object this[string key]
        {
            get
            {
                if (this._properties.ContainsKey(key))
                    return _properties[key];
                if (GetProperty(_instance, key, out object result))
                    return (result);
                return (null);
            }
            set
            {
                if (_properties.ContainsKey(key))
                {
                    _properties[key] = value;
                    return;
                }
                var memberInfos = _instanceType.GetMember(key, BindingFlags.Public | BindingFlags.GetProperty);
                if (memberInfos != null && memberInfos.Length > 0)
                    SetProperty(_instance, key, value);
                else
                    _properties[key] = value;
            }
        }

        public IEnumerable<KeyValuePair<string, object>> GetProperties(bool includeInstanceProperties = false)
        {
            if (includeInstanceProperties && _instance != null)
            {
                foreach (var prop in this.InstancePropertyInfo)
                    yield return (new KeyValuePair<string, object>(prop.Name, prop.GetValue(_instance, null)));
            }
            foreach (var key in this._properties.Keys)
                yield return (new KeyValuePair<string, object>(key, this._properties[key]));
        }

        public bool Contains(KeyValuePair<string, object> item, bool includeInstanceProperties = false)
        {
            if (_properties.ContainsKey(item.Key))
                return (true);
            if (includeInstanceProperties && _instance != null)
            {
                foreach (var prop in this.InstancePropertyInfo)
                {
                    if (prop.Name == item.Key)
                        return (true);
                }
            }
            return (false);
        }

        public T Cast<T>()
        {
            T instance = Activator.CreateInstance<T>();
            this.Initialize(instance);
            foreach (KeyValuePair<string, object> entry in this._properties)
                this.SetProperty(instance, entry.Key, entry.Value);
            return (instance);
        }

        public T GetProperty<T>(string name)
        {
            if (this._properties.ContainsKey(name))
                return ((T)Convert.ChangeType(this._properties[name], typeof(T)));
            if (!this.GetProperty(null, name, out object value))
                return (default(T));
            return((T)Convert.ChangeType(value, typeof(T)));
        }
    }
}
